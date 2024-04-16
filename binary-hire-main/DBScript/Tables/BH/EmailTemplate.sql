IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[EmailTemplate]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[EmailTemplate](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[EmailTypeId] INT NOT NULL,
	[Subject] NVARCHAR(200),
	[Body] NVARCHAR(MAX),
	[OrganizationId] INT NOT NULL,
	[CreatedBy] INT NULL,
	[CreatedDate] DATETIME NULL,
	[ModifiedBy] INT NULL,
	[ModifiedDate] DATETIME NULL
	CONSTRAINT PK_EmailTemplate PRIMARY KEY (Id)
)
END
GO