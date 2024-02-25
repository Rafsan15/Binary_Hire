IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Screening]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[Screening](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[JobPostId] INT NOT NULL CONSTRAINT FK_Screening_JobPost REFERENCES [dbo].[JobPost](Id),
	[WorkflowMasterId] INT NOT NULL CONSTRAINT FK_Screening_WorkflowMaster REFERENCES [dbo].[WorkflowMaster](Id),
	[LocationPath] NVARCHAR(MAX) NOT NULL,
	[Status] INT NOT NULL,
	[UserId] INT,
	CONSTRAINT PK_Screening PRIMARY KEY (Id)
)
END
GO