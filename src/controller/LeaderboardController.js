import BaseController from './BaseController';
import store from "@/store";
import moment from "moment";

export default class LeaderboardController {
  constructor() {
    const addresses = store.getters["user/addresses"];
    this.base = new BaseController(addresses.apiArcadia);
  }

  getLeaderboard(game, filter, limit, skip) {
    try {
      skip = skip || 0;
      limit = limit || 10;
      const query = new URLSearchParams({ ...filter, ...{ limit: limit }, ...{ skip: skip } });
      return this.base._get(`/leaderboard/${game}?${query.toString()}`);
    } catch (error) {
      throw error;
    }
  }

  getLeaderboardArcadia(world, filter, limit, skip) {
    try {
      skip = skip || 0;
      limit = limit || 10;
      const query = new URLSearchParams({ ...filter, ...{ limit: limit }, ...{ skip: skip } });
      return this.base._get(`/worlds/${world}/leaderboard?${query.toString()}`);
    } catch (error) {
      throw error;
    }
  }
  getDaily(game, limit, skip) {
    try {
      const endDateWeek = moment(new Date().getTime());
      const startDateWeek = moment(endDateWeek).hours(0).minutes(0).seconds(0).milliseconds(0);
      limit = limit || 10;
      skip = skip || 0;

      return this.getLeaderboard(game, {
        startDate: startDateWeek.valueOf(),
        endDate: endDateWeek.valueOf(),
      }, limit, skip);
    } catch (error) {
      throw error;
    }
  }

  getWeek(game, limit = 10, skip = 0) {
    try {
      const startDateWeek = moment().startOf("isoWeek");
      const endDateWeek = moment().endOf("isoWeek");

      return this.getLeaderboard(game, {
        startDate: startDateWeek.valueOf(),
        endDate: endDateWeek.valueOf(),
      }, limit, skip);
    } catch (error) {
      throw error;
    }
  }

  getMonth(game, limit, skip) {
    try {
      const endDateMonth = moment(new Date().getTime());
      const startDateMonth = moment(endDateMonth).days(1).hours(0).minutes(0).seconds(0).milliseconds(0);

      limit = limit || 10;
      skip = skip || 0;
      return this.getLeaderboard(game, {
        startDate: startDateMonth.valueOf(),
        endDate: endDateMonth.valueOf(),
      }, limit, skip);
    } catch (error) {
      throw error;
    }
  }

  getArcadia(world = 1, limit = 10, skip = 0) {
    try {
      return this.getLeaderboardArcadia(world, {}, limit, skip);
    } catch (error) {
      throw error;
    }
  }

  getLeaderboardWar(filter, limit = 10, skip = 0) {
    try {
      const query = new URLSearchParams({ ...filter, ...{ limit: limit }, ...{ skip: skip } });
      return this.base._get(`/wars/report/leaderboard?${query.toString()}`);
    } catch (error) {
      throw error;
    }
  }

  getLeaderboardWarDistributedRewards() {
    try {
      return this.base._get('/wars/report/leaderboard/distributed-rewards');
    } catch (error) {
      throw error;
    }
  }


  getLeaderboardDistributedRewards() {
    try {
      return this.base._get('/leaderboard/tmj/distributed-rewards');
    } catch (error) {
      throw error;
    }
  }

}
