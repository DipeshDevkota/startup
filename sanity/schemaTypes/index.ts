import { type SchemaTypeDefinition } from "sanity";
import { author } from "./authorType";
import { startup } from "./startup";

export const schema:{types:SchemaTypeDefinition[]}={
  types: [author,startup],
};
