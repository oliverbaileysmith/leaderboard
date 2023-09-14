export const PORT = 5555;

const mongoDBUser = "oliver";
const mongoDBPassword = "5vFMCXGBmPg3Z6XX4rFuLsFCisbn5Wsr";
const mongoDBCluster = "leaderboard";
const mongoDBTable = "scores";

export const mongoDBURL = `mongodb+srv://${mongoDBUser}:${mongoDBPassword}@${mongoDBCluster}.zdyzuv6.mongodb.net/${mongoDBTable}?retryWrites=true&w=majority`;
