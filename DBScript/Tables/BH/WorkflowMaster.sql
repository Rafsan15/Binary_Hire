IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[WorkflowMaster]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[WorkflowMaster](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] NVARCHAR(50) NOT NULL,
	[OrganizationId] INT NOT NULL CONSTRAINT FK_WorkflowMaster_Organization REFERENCES [dbo].[Organization](Id),
	[CreatedBy] INT NULL,
	[CreatedDate] DATETIME NULL,
	[ModifiedBy] INT NULL,
	[ModifiedDate] DATETIME NULL
	CONSTRAINT PK_WorkflowMasterID PRIMARY KEY (Id)
)
END
GO