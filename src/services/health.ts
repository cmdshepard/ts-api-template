import { Request, Response, Router } from "express";

class Health {

  public isReady: boolean = false;

  public isLive: boolean = false;

  public readonly router: Router = Router();

  constructor() {
    this.router.get("/readiness", this.readinessHandler);
    this.router.get("/liveness", this.livenessHandler);
  }

  private readinessHandler = (_: Request, res: Response) => {
    res.sendStatus(this.isReady ? 200 : 500);
  };

  private livenessHandler = (_: Request, res: Response) => {
    res.sendStatus(this.isLive ? 200 : 500);
  };

}

export default new Health();
