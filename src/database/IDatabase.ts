export default interface IDatabase<T> {
  getDbInstance(): T;
}
