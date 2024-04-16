IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[WorkflowDetail]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[WorkflowDetail](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[WorkflowMasterId] INT NOT NULL CONSTRAINT FK_WorkflowDetail_WorkflowMaster REFERENCES [dbo].[WorkflowMaster](Id),
	[WorkflowTypeId] INT NOT NULL,
	[Priority] INT NOT NULL,
	[CreatedBy] INT,
	[CreatedDate] DATETIME,
	[ModifiedBy] INT,
	[ModifiedDate] DATETIME
	CONSTRAINT PK_WorkflowDetailID PRIMARY KEY (Id)
)
END
GO