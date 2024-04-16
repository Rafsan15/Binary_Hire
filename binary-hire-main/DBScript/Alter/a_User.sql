IF (NOT EXISTS (SELECT *  FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'dbo'  
	AND TABLE_NAME = 'User'  AND COLUMN_NAME='OrganizationId' AND DATA_TYPE = 'INT'))
BEGIN
	ALTER TABLE [dbo].[User] ADD [OrganizationId] INT NOT NULL
	ALTER TABLE [dbo].[User] DROP CONSTRAINT FK_User_Setting;
END;	 	