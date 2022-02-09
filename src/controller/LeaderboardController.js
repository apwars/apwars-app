import BaseController from './BaseController';
import store from "@/store";
import moment from "moment";

export default class LeaderboardController {
  constructor() {
    const addresses = store.getters["user/addresses"];
    this.base = new BaseController(addresses.apiArcadia);
  }

  getLeaderboard(game, filter, limit, skip) {
    if (game === 2) {
      return [{
        account: 'asasasas',
        participations: 2,
        score: 6005974,
        wGOLD: 554859697,
        wCOURAGE: 1247961
      },
      {
        account: 'asasasaascaeqs',
        participations: 2,
        score: 6005974,
        wGOLD: 554859697,
        wCOURAGE: 1247961
      },
      {
        account: 'asdfdrasasas',
        participations: 2,
        score: 6005974,
        wGOLD: 554859697,
        wCOURAGE: 1247961
      },
      {
        account: 'asasasasdsac',
        participations: 2,
        score: 6005974,
        wGOLD: 554859697,
        wCOURAGE: 1247961
      },
      {
        account: 'asasasasgrhte',
        participations: 2,
        score: 6005974,
        wGOLD: 554859697,
        wCOURAGE: 1247961
      }]
    };

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

  getWeek(game, limit, skip) {
    try {
      const startDateWeek = moment().startOf("isoWeek");
      const endDateWeek = moment().endOf("isoWeek");
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

  getArcadia(world, limit, skip) {
    try {
      limit = limit || 10;
      skip = skip || 0;

      return this.getLeaderboardArcadia(world, {}, limit, skip);
    } catch (error) {
      throw error;
    }
  }

}
