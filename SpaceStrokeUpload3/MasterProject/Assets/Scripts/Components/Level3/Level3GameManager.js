class Level3GameManager
{
    constructor(owner)
    {
        this.owner = owner;

        this.activeTiles = [];
        this.killTiles = [];
        this.killTime = .25;
        
        this.tileScale = new Vector2(150, 350);
        this.tileVelocity = 55;

        this.CreateHeight = -500;
        this.DestroyHeight = 1300;

        this.randXSpawns = [750, 900, 1050];
    }

    Update()
    {
        let retArgs = [];
        this.CheckKillTile();
        this.KillTiles();

        this.AdvanceTiles();
        
        this.TryRemoveTiles();
        this.TryCreateTiles();

        this.DrawTiles();  
    }

    AdvanceTiles()
    {
        for (let i = 0; i < this.activeTiles.length; i++)
        {
            let pos = this.activeTiles[i];
            
            pos = pos.Add(new Vector2(0, deltaTime / 100 * this.tileVelocity));
            
            this.activeTiles[i] = pos;
        }
    }

    DrawTiles()
    {
        for (let i = 0; i < this.activeTiles.length; i++)
        {
            let val = this.GetCol(this.activeTiles[i].y);
            fill(val, val, val);
            rect(this.activeTiles[i].x, this.activeTiles[i].y, this.tileScale.x, this.tileScale.y);
        }
    }

    TryRemoveTiles()
    {
        if (this.activeTiles.length == 0)
        {
            return;
        }
        if (this.activeTiles[0].y > this.DestroyHeight)
        {
            let newArr = [];
            for (let i = 0; i < this.activeTiles.length-1; i++)
            {
                newArr[i] = this.activeTiles[i + 1];
            }
            this.activeTiles = newArr;
        }
    }

    TryCreateTiles()
    {
        if (this.activeTiles.length == 0)
        {
            let spawnY = this.CreateHeight;
            console.log(this.randXSpawns);
            let spawnX = this.randXSpawns[this.getRandomInt(3)];
            this.activeTiles.push(new Vector2(spawnX, spawnY));
        }

        if (this.activeTiles[this.activeTiles.length - 1].y > this.CreateHeight)
        {
            let spawnY = this.activeTiles[this.activeTiles.length - 1].y - this.tileScale.y;
            let spawnX = this.randXSpawns[this.getRandomInt(3)];
            this.activeTiles.push(new Vector2(spawnX, spawnY));
        }
    }

    getRandomInt(max) 
    {
        return Math.floor(Math.random() * max);
    }     

    CheckKillTile()
    {
        if (mouseIsPressed)
        {   
            let tile = this.activeTiles[0];
            //console.log(tile.x, tile.y);
            
            if (tile.x < mouseX && tile.x + this.tileScale.x > mouseX)
            {
                if (tile.y < mouseY && tile.y + this.tileScale.y > mouseY)
                {
                    //console.log("Tried Kill");
                    this.killTiles = [];
                    //console.log("Kill Tiles Pre Push: " + this.killTiles);
                    this.killTiles.push(tile.x, tile.y, this.killTime, this.tileScale.x, this.GetCol(tile.y));
                    //console.log("Kill Tiles Post Push: " + this.killTiles);
                    this.activeTiles = this.RemoveFirstItem(this.activeTiles);
                }
            }

        }
    }
        


    KillTiles()
    {
        //console.log("Kill Tiles Loop: " + this.killTiles);
        //this.killTiles = this.killTiles.slice(0, 1)
        //console.log(this.killTiles);
        for (let i = 0; i < this.killTiles.length; i+=5)
        {
            //console.log("Kill Tiles: " + this.killTiles);

            this.killTiles[i+2] -= deltaTime / 1000;
            this.killTiles[i+3] += deltaTime / 1000 * 190;

            if (this.killTiles[i+2] < 0)
            {
                this.killTiles = [];
                return;
            }

            //console.log("Col: " + this.killTiles[i+4]);
            let val = this.killTiles[i+2] / this.killTime;
            let c = color(this.killTiles[i+4], this.killTiles[i+4], this.killTiles[i+4], val * 255);
            fill(c);
            let size = this.killTiles[i+3];

            rect(this.killTiles[i] - ((this.killTiles[i+3] - this.tileScale.x) / 2), this.killTiles[i+1] - ((this.killTiles[i+3] - this.tileScale.x) / 2), size, size * 2.3333);
        }
    }

    CleanArr(arr)
    {
        for (let i = 0; i < arr.length; i++)
        {
            if (arr[i] == NaN || arr[i] == "")
            {
                arr.slice(i, 1);
            }
        }
        return arr;
    }

    GetCol(val)
    {
        return lerp(0, 255, (val + 150.0) / 1670.0);
    }

    RemoveFirstItem(arr)
    {
        if (arr.length <= 1)
        {
            return [];
        }

        let newArr = [];
        for (let i = 1; i < arr.length; i++)
        {
            newArr.push(arr[i]);
        }
        return newArr;
    }
}