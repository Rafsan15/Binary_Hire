IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[User]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[User](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserName] NVARCHAR(50) NOT NULL,
	[FirstName] NVARCHAR(50) NULL,
	[LastName] NVARCHAR(50) NULL,
	[AspnetUserId] NVARCHAR(450) NOT NULL CONSTRAINT FK_User_AspNetUsers REFERENCES dbo.AspNetUsers(Id),
	[UserTypeId] INT NOT NULL CONSTRAINT FK_User_Setting REFERENCES [dbo].[Setting](Id), -- will come from UserType in settings
	[Email] NVARCHAR(50) NOT NULL,
	[PhoneNumber] NVARCHAR(50) NULL,
	[Active] [bit] DEFAULT 1,
	CONSTRAINT PK_UserID PRIMARY KEY (Id)
)
END
GO