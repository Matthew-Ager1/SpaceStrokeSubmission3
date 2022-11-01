class Level2GameManager
{
    constructor(owner, playerObj, playerSize, goalImage)
    {
        this.owner = owner;
        this.playerObj = playerObj;
        this.playerSize = playerSize;

        this.center = new Vector2(960, 400);
        this.radiusBounds = new Vector2(300, 350);
        this.holdingPlayer = false;
        this.points = 0;
        this.pointsScaleIncrement;

        this.goal = new Vector2(0, 0);
        this.goalImage = goalImage;

        this.init = false;
    }

    Update()
    {
        console.log("Updated Level2GameManager");
        if (!this.init)
        {
            this.init = true;
            this.goal = this.CreateNewGoal();

            console.log("Sent Create Command: " + this.goal);
            return ["create", this.goal];
            //retArgs.push("create");
            //retArgs.push(this.goal);
        }

        /*let retArgs = [];

        this.holdingPlayer = this.IsHoldingPlayer();
        
        this.UpdatePlayerPosition();
        if (this.PlayerHitWall())
        {
            //end Game
        }

        if (this.CheckPlayerAtGoal())
        {
            this.IncrementScore();

            retArgs.push("destroy");
            retArgs.push(this.goal);

            this.goal = this.CreateNewGoal();

            retArgs.push("create");
            retArgs.push(this.goal);
        }*/

        //return retArgs;
    }

    UpdatePlayerPosition()
    {
        if (this.holdingPlayer)
        {
            this.playerObj.x = mouseX - this.playerSize / 2;
            this.playerObj.y = mouseY - this.playerSize / 2;
        }
    }
    IncrementScore()
    {
        points++;
        playerSize += pointsScaleIncrement;
        playerObj.GetComponent(0).radius = playerSize;
        playerObj.GetComponent(0).width  = playerSize / 2;
        playerObj.GetComponent(0).height = playerSize / 2;
    }
    CheckPlayerAtGoal()
    {
        return this.DistanceToPlayer(new Vector2(this.goal.x, this.goal.y)) < 50;
    }
    CreateNewGoal()
    {
        let p = new Vector2(random(-1.0, 1.0), random(-1.0, 1.0));  
        p = p.Normalize();
        p = p.Mult((this.radiusBounds.x + this.radiusBounds.y) / 2);

        let obj_goal = new BaseObject(100, 100);//new BaseObject(p.x, p.y);
        obj_goal.AddComponent(new ImageComponent(obj_goal, this.goalImage, 460, 460));
        obj_goal.AddComponent(new DebugComponent())
        return obj_goal;
    }
    PlayerHitWall()
    {
        return this.DistanceToPlayer(this.center) < this.radiusBounds.x || this.DistanceToPlayer(this.center) > this.radiusBounds.y;
    }
    IsHoldingPlayer()
    {
        if (this.holdingPlayer)
        {
            return mouseIsPressed;
        }
        else
        {
            return mouseIsPressed && this.DistanceToPlayer(new Vector2(mouseX, mouseY)) < this.playerSize / 2;
        }
    }
    DistanceToPlayer(point)
    {
        let xDiff = point.x - (this.playerObj.x + this.playerSize / 2);
        let yDiff = point.y - (this.playerObj.y + this.playerSize / 2);
        return sqrt(pow(xDiff, 2) + pow(yDiff, 2));
    }
}