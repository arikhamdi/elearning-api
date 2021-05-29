BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "courses_module" (
	"id"	integer NOT NULL PRIMARY KEY AUTOINCREMENT,
	"title"	varchar(200) NOT NULL,
	"publish"	datetime NOT NULL,
	"status"	varchar(10) NOT NULL,
	"course_id"	integer NOT NULL,
	"overview"	text NOT NULL,
	"order"	integer unsigned NOT NULL CHECK("order">=0),
	FOREIGN KEY("course_id") REFERENCES "courses_course"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "courses_content" (
	"id"	integer NOT NULL PRIMARY KEY AUTOINCREMENT,
	"object_id"	integer unsigned NOT NULL CHECK("object_id">=0),
	"content_type_id"	integer NOT NULL,
	"module_id"	integer NOT NULL,
	"order"	integer unsigned NOT NULL CHECK("order">=0),
	FOREIGN KEY("module_id") REFERENCES "courses_module"("id") DEFERRABLE INITIALLY DEFERRED,
	FOREIGN KEY("content_type_id") REFERENCES "django_content_type"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "courses_video" (
	"id"	integer NOT NULL PRIMARY KEY AUTOINCREMENT,
	"title"	varchar(200) NOT NULL,
	"created"	datetime NOT NULL,
	"updated"	datetime NOT NULL,
	"owner_id"	integer NOT NULL,
	"video"	varchar(100) NOT NULL,
	FOREIGN KEY("owner_id") REFERENCES "users_user"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "users_user" (
	"id"	integer NOT NULL PRIMARY KEY AUTOINCREMENT,
	"password"	varchar(128) NOT NULL,
	"last_login"	datetime,
	"is_superuser"	bool NOT NULL,
	"email"	varchar(255) NOT NULL UNIQUE,
	"name"	varchar(255) NOT NULL,
	"is_active"	bool NOT NULL,
	"is_staff"	bool NOT NULL,
	"date_joined"	datetime NOT NULL,
	"is_teacher"	bool NOT NULL,
	"first_name"	varchar(255) NOT NULL,
	"last_name"	varchar(255) NOT NULL,
	"subscribed"	datetime
);
CREATE TABLE IF NOT EXISTS "socialaccount_socialaccount" (
	"id"	integer NOT NULL PRIMARY KEY AUTOINCREMENT,
	"provider"	varchar(30) NOT NULL,
	"uid"	varchar(191) NOT NULL,
	"last_login"	datetime NOT NULL,
	"date_joined"	datetime NOT NULL,
	"user_id"	integer NOT NULL,
	"extra_data"	text NOT NULL,
	FOREIGN KEY("user_id") REFERENCES "users_user"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "socialaccount_socialapp" (
	"id"	integer NOT NULL PRIMARY KEY AUTOINCREMENT,
	"provider"	varchar(30) NOT NULL,
	"name"	varchar(40) NOT NULL,
	"client_id"	varchar(191) NOT NULL,
	"key"	varchar(191) NOT NULL,
	"secret"	varchar(191) NOT NULL
);
CREATE TABLE IF NOT EXISTS "socialaccount_socialtoken" (
	"id"	integer NOT NULL PRIMARY KEY AUTOINCREMENT,
	"token"	text NOT NULL,
	"token_secret"	text NOT NULL,
	"expires_at"	datetime,
	"account_id"	integer NOT NULL,
	"app_id"	integer NOT NULL,
	FOREIGN KEY("app_id") REFERENCES "socialaccount_socialapp"("id") DEFERRABLE INITIALLY DEFERRED,
	FOREIGN KEY("account_id") REFERENCES "socialaccount_socialaccount"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "socialaccount_socialapp_sites" (
	"id"	integer NOT NULL PRIMARY KEY AUTOINCREMENT,
	"socialapp_id"	integer NOT NULL,
	"site_id"	integer NOT NULL,
	FOREIGN KEY("socialapp_id") REFERENCES "socialaccount_socialapp"("id") DEFERRABLE INITIALLY DEFERRED,
	FOREIGN KEY("site_id") REFERENCES "django_site"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "django_site" (
	"id"	integer NOT NULL PRIMARY KEY AUTOINCREMENT,
	"name"	varchar(50) NOT NULL,
	"domain"	varchar(100) NOT NULL UNIQUE
);
CREATE TABLE IF NOT EXISTS "django_session" (
	"session_key"	varchar(40) NOT NULL,
	"session_data"	text NOT NULL,
	"expire_date"	datetime NOT NULL,
	PRIMARY KEY("session_key")
);
CREATE TABLE IF NOT EXISTS "django_rest_passwordreset_resetpasswordtoken" (
	"created_at"	datetime NOT NULL,
	"key"	varchar(64) NOT NULL UNIQUE,
	"ip_address"	char(39),
	"user_id"	integer NOT NULL,
	"id"	integer NOT NULL PRIMARY KEY AUTOINCREMENT,
	"user_agent"	varchar(256) NOT NULL,
	FOREIGN KEY("user_id") REFERENCES "users_user"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "courses_course" (
	"id"	integer NOT NULL PRIMARY KEY AUTOINCREMENT,
	"title"	varchar(200) NOT NULL,
	"slug"	varchar(200) UNIQUE,
	"overview"	text NOT NULL,
	"created"	datetime NOT NULL,
	"updated"	datetime NOT NULL,
	"status"	varchar(10) NOT NULL,
	"owner_id"	integer NOT NULL,
	"subject_id"	integer NOT NULL,
	"image"	varchar(200) NOT NULL,
	"publish"	datetime,
	FOREIGN KEY("owner_id") REFERENCES "users_user"("id") DEFERRABLE INITIALLY DEFERRED,
	FOREIGN KEY("subject_id") REFERENCES "courses_subject"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "courses_content_currently_viewing" (
	"id"	integer NOT NULL PRIMARY KEY AUTOINCREMENT,
	"content_id"	integer NOT NULL,
	"user_id"	integer NOT NULL,
	FOREIGN KEY("user_id") REFERENCES "users_user"("id") DEFERRABLE INITIALLY DEFERRED,
	FOREIGN KEY("content_id") REFERENCES "courses_content"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "courses_content_already_seen" (
	"id"	integer NOT NULL PRIMARY KEY AUTOINCREMENT,
	"content_id"	integer NOT NULL,
	"user_id"	integer NOT NULL,
	FOREIGN KEY("user_id") REFERENCES "users_user"("id") DEFERRABLE INITIALLY DEFERRED,
	FOREIGN KEY("content_id") REFERENCES "courses_content"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "courses_course_students" (
	"id"	integer NOT NULL PRIMARY KEY AUTOINCREMENT,
	"course_id"	integer NOT NULL,
	"user_id"	integer NOT NULL,
	FOREIGN KEY("user_id") REFERENCES "users_user"("id") DEFERRABLE INITIALLY DEFERRED,
	FOREIGN KEY("course_id") REFERENCES "courses_course"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "courses_file" (
	"id"	integer NOT NULL PRIMARY KEY AUTOINCREMENT,
	"title"	varchar(200) NOT NULL,
	"created"	datetime NOT NULL,
	"updated"	datetime NOT NULL,
	"file"	varchar(250) NOT NULL,
	"owner_id"	integer NOT NULL,
	FOREIGN KEY("owner_id") REFERENCES "users_user"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "courses_image" (
	"id"	integer NOT NULL PRIMARY KEY AUTOINCREMENT,
	"title"	varchar(200) NOT NULL,
	"created"	datetime NOT NULL,
	"updated"	datetime NOT NULL,
	"image"	varchar(250) NOT NULL,
	"owner_id"	integer NOT NULL,
	FOREIGN KEY("owner_id") REFERENCES "users_user"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "courses_text" (
	"id"	integer NOT NULL PRIMARY KEY AUTOINCREMENT,
	"title"	varchar(200) NOT NULL,
	"created"	datetime NOT NULL,
	"updated"	datetime NOT NULL,
	"content"	text NOT NULL,
	"owner_id"	integer NOT NULL,
	FOREIGN KEY("owner_id") REFERENCES "users_user"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "courses_subject" (
	"id"	integer NOT NULL PRIMARY KEY AUTOINCREMENT,
	"title"	varchar(200) NOT NULL,
	"slug"	varchar(200) NOT NULL UNIQUE
);
CREATE TABLE IF NOT EXISTS "authtoken_token" (
	"key"	varchar(40) NOT NULL,
	"created"	datetime NOT NULL,
	"user_id"	integer NOT NULL UNIQUE,
	FOREIGN KEY("user_id") REFERENCES "users_user"("id") DEFERRABLE INITIALLY DEFERRED,
	PRIMARY KEY("key")
);
CREATE TABLE IF NOT EXISTS "django_admin_log" (
	"id"	integer NOT NULL PRIMARY KEY AUTOINCREMENT,
	"action_time"	datetime NOT NULL,
	"object_id"	text,
	"object_repr"	varchar(200) NOT NULL,
	"change_message"	text NOT NULL,
	"content_type_id"	integer,
	"user_id"	integer NOT NULL,
	"action_flag"	smallint unsigned NOT NULL CHECK("action_flag">=0),
	FOREIGN KEY("user_id") REFERENCES "users_user"("id") DEFERRABLE INITIALLY DEFERRED,
	FOREIGN KEY("content_type_id") REFERENCES "django_content_type"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "account_emailaddress" (
	"id"	integer NOT NULL PRIMARY KEY AUTOINCREMENT,
	"verified"	bool NOT NULL,
	"primary"	bool NOT NULL,
	"user_id"	integer NOT NULL,
	"email"	varchar(254) NOT NULL UNIQUE,
	FOREIGN KEY("user_id") REFERENCES "users_user"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "account_emailconfirmation" (
	"id"	integer NOT NULL PRIMARY KEY AUTOINCREMENT,
	"created"	datetime NOT NULL,
	"sent"	datetime,
	"key"	varchar(64) NOT NULL UNIQUE,
	"email_address_id"	integer NOT NULL,
	FOREIGN KEY("email_address_id") REFERENCES "account_emailaddress"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "users_user_user_permissions" (
	"id"	integer NOT NULL PRIMARY KEY AUTOINCREMENT,
	"user_id"	integer NOT NULL,
	"permission_id"	integer NOT NULL,
	FOREIGN KEY("permission_id") REFERENCES "auth_permission"("id") DEFERRABLE INITIALLY DEFERRED,
	FOREIGN KEY("user_id") REFERENCES "users_user"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "users_user_groups" (
	"id"	integer NOT NULL PRIMARY KEY AUTOINCREMENT,
	"user_id"	integer NOT NULL,
	"group_id"	integer NOT NULL,
	FOREIGN KEY("group_id") REFERENCES "auth_group"("id") DEFERRABLE INITIALLY DEFERRED,
	FOREIGN KEY("user_id") REFERENCES "users_user"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "auth_group" (
	"id"	integer NOT NULL PRIMARY KEY AUTOINCREMENT,
	"name"	varchar(150) NOT NULL UNIQUE
);
CREATE TABLE IF NOT EXISTS "auth_permission" (
	"id"	integer NOT NULL PRIMARY KEY AUTOINCREMENT,
	"content_type_id"	integer NOT NULL,
	"codename"	varchar(100) NOT NULL,
	"name"	varchar(255) NOT NULL,
	FOREIGN KEY("content_type_id") REFERENCES "django_content_type"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "auth_group_permissions" (
	"id"	integer NOT NULL PRIMARY KEY AUTOINCREMENT,
	"group_id"	integer NOT NULL,
	"permission_id"	integer NOT NULL,
	FOREIGN KEY("permission_id") REFERENCES "auth_permission"("id") DEFERRABLE INITIALLY DEFERRED,
	FOREIGN KEY("group_id") REFERENCES "auth_group"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "django_content_type" (
	"id"	integer NOT NULL PRIMARY KEY AUTOINCREMENT,
	"app_label"	varchar(100) NOT NULL,
	"model"	varchar(100) NOT NULL
);
CREATE TABLE IF NOT EXISTS "django_migrations" (
	"id"	integer NOT NULL PRIMARY KEY AUTOINCREMENT,
	"app"	varchar(255) NOT NULL,
	"name"	varchar(255) NOT NULL,
	"applied"	datetime NOT NULL
);
CREATE INDEX IF NOT EXISTS "courses_module_course_id_7d4820de" ON "courses_module" (
	"course_id"
);
CREATE INDEX IF NOT EXISTS "courses_content_module_id_38e9abef" ON "courses_content" (
	"module_id"
);
CREATE INDEX IF NOT EXISTS "courses_content_content_type_id_e6d9a477" ON "courses_content" (
	"content_type_id"
);
CREATE INDEX IF NOT EXISTS "courses_video_owner_id_753691d5" ON "courses_video" (
	"owner_id"
);
CREATE INDEX IF NOT EXISTS "socialaccount_socialaccount_user_id_8146e70c" ON "socialaccount_socialaccount" (
	"user_id"
);
CREATE UNIQUE INDEX IF NOT EXISTS "socialaccount_socialaccount_provider_uid_fc810c6e_uniq" ON "socialaccount_socialaccount" (
	"provider",
	"uid"
);
CREATE INDEX IF NOT EXISTS "socialaccount_socialtoken_app_id_636a42d7" ON "socialaccount_socialtoken" (
	"app_id"
);
CREATE INDEX IF NOT EXISTS "socialaccount_socialtoken_account_id_951f210e" ON "socialaccount_socialtoken" (
	"account_id"
);
CREATE INDEX IF NOT EXISTS "socialaccount_socialapp_sites_site_id_2579dee5" ON "socialaccount_socialapp_sites" (
	"site_id"
);
CREATE INDEX IF NOT EXISTS "socialaccount_socialapp_sites_socialapp_id_97fb6e7d" ON "socialaccount_socialapp_sites" (
	"socialapp_id"
);
CREATE UNIQUE INDEX IF NOT EXISTS "socialaccount_socialapp_sites_socialapp_id_site_id_71a9a768_uniq" ON "socialaccount_socialapp_sites" (
	"socialapp_id",
	"site_id"
);
CREATE UNIQUE INDEX IF NOT EXISTS "socialaccount_socialtoken_app_id_account_id_fca4e0ac_uniq" ON "socialaccount_socialtoken" (
	"app_id",
	"account_id"
);
CREATE INDEX IF NOT EXISTS "django_session_expire_date_a5c62663" ON "django_session" (
	"expire_date"
);
CREATE INDEX IF NOT EXISTS "django_rest_passwordreset_resetpasswordtoken_user_id_e8015b11" ON "django_rest_passwordreset_resetpasswordtoken" (
	"user_id"
);
CREATE INDEX IF NOT EXISTS "courses_course_subject_id_7a2c8100" ON "courses_course" (
	"subject_id"
);
CREATE INDEX IF NOT EXISTS "courses_course_owner_id_97a468c6" ON "courses_course" (
	"owner_id"
);
CREATE INDEX IF NOT EXISTS "courses_content_currently_viewing_user_id_eb7237a8" ON "courses_content_currently_viewing" (
	"user_id"
);
CREATE INDEX IF NOT EXISTS "courses_content_currently_viewing_content_id_d7315444" ON "courses_content_currently_viewing" (
	"content_id"
);
CREATE UNIQUE INDEX IF NOT EXISTS "courses_content_currently_viewing_content_id_user_id_133ec0f9_uniq" ON "courses_content_currently_viewing" (
	"content_id",
	"user_id"
);
CREATE INDEX IF NOT EXISTS "courses_content_already_seen_user_id_fbf8929c" ON "courses_content_already_seen" (
	"user_id"
);
CREATE INDEX IF NOT EXISTS "courses_content_already_seen_content_id_8fd367f6" ON "courses_content_already_seen" (
	"content_id"
);
CREATE UNIQUE INDEX IF NOT EXISTS "courses_content_already_seen_content_id_user_id_1390c5c2_uniq" ON "courses_content_already_seen" (
	"content_id",
	"user_id"
);
CREATE INDEX IF NOT EXISTS "courses_course_students_user_id_7e195ad6" ON "courses_course_students" (
	"user_id"
);
CREATE INDEX IF NOT EXISTS "courses_course_students_course_id_2c36f816" ON "courses_course_students" (
	"course_id"
);
CREATE UNIQUE INDEX IF NOT EXISTS "courses_course_students_course_id_user_id_8f9097c6_uniq" ON "courses_course_students" (
	"course_id",
	"user_id"
);
CREATE INDEX IF NOT EXISTS "courses_file_owner_id_63963a75" ON "courses_file" (
	"owner_id"
);
CREATE INDEX IF NOT EXISTS "courses_image_owner_id_825053fe" ON "courses_image" (
	"owner_id"
);
CREATE INDEX IF NOT EXISTS "courses_text_owner_id_8f5e7e45" ON "courses_text" (
	"owner_id"
);
CREATE INDEX IF NOT EXISTS "django_admin_log_user_id_c564eba6" ON "django_admin_log" (
	"user_id"
);
CREATE INDEX IF NOT EXISTS "django_admin_log_content_type_id_c4bce8eb" ON "django_admin_log" (
	"content_type_id"
);
CREATE INDEX IF NOT EXISTS "account_emailaddress_user_id_2c513194" ON "account_emailaddress" (
	"user_id"
);
CREATE INDEX IF NOT EXISTS "account_emailconfirmation_email_address_id_5b7f8c58" ON "account_emailconfirmation" (
	"email_address_id"
);
CREATE INDEX IF NOT EXISTS "users_user_user_permissions_permission_id_0b93982e" ON "users_user_user_permissions" (
	"permission_id"
);
CREATE INDEX IF NOT EXISTS "users_user_user_permissions_user_id_20aca447" ON "users_user_user_permissions" (
	"user_id"
);
CREATE UNIQUE INDEX IF NOT EXISTS "users_user_user_permissions_user_id_permission_id_43338c45_uniq" ON "users_user_user_permissions" (
	"user_id",
	"permission_id"
);
CREATE INDEX IF NOT EXISTS "users_user_groups_group_id_9afc8d0e" ON "users_user_groups" (
	"group_id"
);
CREATE INDEX IF NOT EXISTS "users_user_groups_user_id_5f6f5a90" ON "users_user_groups" (
	"user_id"
);
CREATE UNIQUE INDEX IF NOT EXISTS "users_user_groups_user_id_group_id_b88eab82_uniq" ON "users_user_groups" (
	"user_id",
	"group_id"
);
CREATE INDEX IF NOT EXISTS "auth_permission_content_type_id_2f476e4b" ON "auth_permission" (
	"content_type_id"
);
CREATE UNIQUE INDEX IF NOT EXISTS "auth_permission_content_type_id_codename_01ab375a_uniq" ON "auth_permission" (
	"content_type_id",
	"codename"
);
CREATE INDEX IF NOT EXISTS "auth_group_permissions_permission_id_84c5c92e" ON "auth_group_permissions" (
	"permission_id"
);
CREATE INDEX IF NOT EXISTS "auth_group_permissions_group_id_b120cbf9" ON "auth_group_permissions" (
	"group_id"
);
CREATE UNIQUE INDEX IF NOT EXISTS "auth_group_permissions_group_id_permission_id_0cd325b0_uniq" ON "auth_group_permissions" (
	"group_id",
	"permission_id"
);
CREATE UNIQUE INDEX IF NOT EXISTS "django_content_type_app_label_model_76bd3d3b_uniq" ON "django_content_type" (
	"app_label",
	"model"
);
COMMIT;
