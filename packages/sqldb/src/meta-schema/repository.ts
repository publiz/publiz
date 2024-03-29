import { createCrudRepository } from "../crud";
import { SqlDatabase } from "../database";
import { MetaSchemaRow, MetaSchemaTable } from "./model";

export const createMetaSchemaCrudRepository = (db: SqlDatabase) =>
  createCrudRepository<MetaSchemaTable>(db, "meta_schemas");

export const findMetaSchemasByOrganizationId = (
  db: SqlDatabase,
  organizationId: number
): Promise<MetaSchemaRow[]> => {
  return db
    .selectFrom("meta_schemas")
    .selectAll()
    .where("organizationId", "=", organizationId)
    .execute();
};

export const findSystemMetaSchemas = (
  db: SqlDatabase
): Promise<MetaSchemaRow[]> => {
  return db
    .selectFrom("meta_schemas")
    .selectAll()
    .where("organizationId", "is", null)
    .execute();
};

export const updateIsDefaultValueAllMetaSchemasByOrganizationIdTarget = (
  db: SqlDatabase,
  organizationId: number | null,
  target: string,
  value: boolean
) => {
  return db
    .updateTable("meta_schemas")
    .set("isDefault", value)
    .where("organizationId", "=", organizationId)
    .where("target", "=", target)
    .execute();
};
