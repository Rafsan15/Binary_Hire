IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Setting]') AND type in (N'U'))
CREATE TABLE [dbo].[Setting](
	ID INT IDENTITY(1,1) NOT NULL,
	SettingType NVARCHAR(100),
	SettingSubType NVARCHAR(100),
	DisplayText NVARCHAR(100),
 CONSTRAINT PK_SettingID PRIMARY KEY (ID)
 )
GO