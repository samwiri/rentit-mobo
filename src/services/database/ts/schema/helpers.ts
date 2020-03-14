import { isString, tail } from 'lodash';

// Push a new query onto the compiled "sequence" stack,
// creating a new formatter, returning the compiler.
export function pushQuery(query) {
  if (!query) {
    return;
  }
  if (isString(query)) {
    query = { sql: query };
  }
  if (!query.bindings) {
    query.bindings = this.formatter.bindings;
  }
  this.sequence.push(query);

  this.formatter = this.client.formatter(this._commonBuilder);
}

// Used in cases where we need to push some additional column specific statements.
export function pushAdditional(...parameters) {
  let [fn] = parameters;
  const child = new this.constructor(this.client, this.tableCompiler, this.columnBuilder);
  fn.call(child, tail(parameters));
  this.sequence.additional = (this.sequence.additional || []).concat(child.sequence);
}

// Unshift a new query onto the compiled "sequence" stack,
// creating a new formatter, returning the compiler.
export function unshiftQuery(query) {
  if (!query) {
    return;
  }
  if (isString(query)) {
    query = { sql: query };
  }
  if (!query.bindings) {
    query.bindings = this.formatter.bindings;
  }
  this.sequence.unshift(query);

  this.formatter = this.client.formatter(this._commonBuilder);
}

export default {
  pushAdditional,
  pushQuery,
  unshiftQuery,
};