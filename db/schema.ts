import { sqliteTable, text, integer, index, uniqueIndex } from 'drizzle-orm/sqlite-core';
export const workspaces=sqliteTable('workspaces',{
  owner:text('owner').primaryKey(), settings:text('settings').notNull(), createdAt:text('created_at').notNull(),
});
export const cases=sqliteTable('cases',{
  id:text('id').primaryKey(),owner:text('owner').notNull(),requestId:text('request_id'),status:text('status').notNull(),ward:integer('ward').notNull(),version:integer('version').notNull(),updatedAt:text('updated_at').notNull(),data:text('data').notNull(),
},t=>[index('idx_cases_owner_updated').on(t.owner,t.updatedAt),uniqueIndex('idx_cases_owner_request').on(t.owner,t.requestId)]);
export const events=sqliteTable('events',{
  id:text('id').primaryKey(),owner:text('owner').notNull(),caseId:text('case_id'),actor:text('actor').notNull(),action:text('action').notNull(),detail:text('detail').notNull(),createdAt:text('created_at').notNull(),
},t=>[index('idx_events_owner_case').on(t.owner,t.caseId)]);
export const evidence=sqliteTable('evidence',{
  id:text('id').primaryKey(),owner:text('owner').notNull(),caseId:text('case_id').notNull(),taskId:text('task_id'),taskCycle:integer('task_cycle').notNull().default(0),purpose:text('purpose').notNull(),objectKey:text('object_key').notNull(),filename:text('filename').notNull(),mime:text('mime').notNull(),size:integer('size').notNull(),createdAt:text('created_at').notNull(),
},t=>[index('idx_evidence_owner_case').on(t.owner,t.caseId)]);

// Earlier applied tables are retained for migration compatibility.
export const landReports=sqliteTable('land_reports',{
  id:text('id').primaryKey(),owner:text('owner').notNull(),kind:text('kind').notNull(),title:text('title').notNull(),status:text('status').notNull(),shared:integer('shared').notNull().default(0),version:integer('version').notNull().default(1),payloadHash:text('payload_hash').notNull(),report:text('report').notNull(),createdAt:text('created_at').notNull(),updatedAt:text('updated_at').notNull(),
  category:text('category').notNull().default('unclassified'),risk:text('risk').notNull().default('UNKNOWN'),classifiedBy:text('classified_by'),
  assignedContactId:text('assigned_contact_id').references(()=>landContacts.id),referral:text('referral'),
},t=>[index('idx_land_reports_owner').on(t.owner,t.updatedAt),index('idx_land_reports_shared').on(t.shared,t.updatedAt)]);
export const landAttachments=sqliteTable('land_attachments',{
  id:text('id').primaryKey(),reportId:text('report_id').notNull().references(()=>landReports.id),owner:text('owner').notNull(),objectKey:text('object_key').notNull(),filename:text('filename').notNull(),mime:text('mime').notNull(),size:integer('size').notNull(),sha256:text('sha256').notNull(),createdAt:text('created_at').notNull(),
},t=>[index('idx_land_attachments_owner').on(t.owner,t.reportId),uniqueIndex('idx_land_attachments_content').on(t.owner,t.reportId,t.sha256)]);
export const landEvents=sqliteTable('land_events',{
  id:text('id').primaryKey(),reportId:text('report_id').notNull().references(()=>landReports.id),actor:text('actor').notNull(),action:text('action').notNull(),detail:text('detail').notNull(),createdAt:text('created_at').notNull(),
},t=>[index('idx_land_events_report').on(t.reportId,t.createdAt)]);
export const landMapCache=sqliteTable('land_map_cache',{
  cacheKey:text('cache_key').primaryKey(),payload:text('payload').notNull(),expiresAt:integer('expires_at').notNull(),
},t=>[index('idx_land_map_cache_expiry').on(t.expiresAt)]);
export const landMapProviderState=sqliteTable('land_map_provider_state',{
  provider:text('provider').primaryKey(),lastRequestAt:integer('last_request_at').notNull().default(0),
});
export const landContacts=sqliteTable('land_contacts',{
  id:text('id').primaryKey(),officeName:text('office_name').notNull(),personName:text('person_name').notNull().default(''),districtKey:text('district_key').notNull().default(''),upazilaKey:text('upazila_key').notNull().default(''),active:integer('active').notNull().default(1),version:integer('version').notNull().default(1),data:text('data').notNull(),updatedBy:text('updated_by').notNull(),updatedAt:text('updated_at').notNull(),
},t=>[index('idx_land_contacts_area').on(t.active,t.districtKey,t.upazilaKey)]);

export const landUsers=sqliteTable('land_users',{
  id:text('id').primaryKey(),email:text('email').notNull(),name:text('name').notNull(),passwordHash:text('password_hash').notNull(),role:text('role').notNull().default('user'),isDemo:integer('is_demo').notNull().default(0),phone:text('phone').notNull().default(''),district:text('district').notNull().default(''),address:text('address').notNull().default(''),createdAt:text('created_at').notNull(),
},t=>[uniqueIndex('idx_land_users_email').on(t.email)]);
export const landSessions=sqliteTable('land_sessions',{
  tokenHash:text('token_hash').primaryKey(),userId:text('user_id').notNull().references(()=>landUsers.id),expiresAt:integer('expires_at').notNull(),
},t=>[index('idx_land_sessions_expiry').on(t.expiresAt),index('idx_land_sessions_user').on(t.userId)]);
export const landAuthLimits=sqliteTable('land_auth_limits',{
  key:text('key').primaryKey(),hits:integer('hits').notNull(),expiresAt:integer('expires_at').notNull(),
},t=>[index('idx_land_auth_limits_expiry').on(t.expiresAt)]);
