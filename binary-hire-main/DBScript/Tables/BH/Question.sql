IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Question]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[Question](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[JobId] INT NOT NULL CONSTRAINT FK_Question_JobPost REFERENCES [dbo].[JobPost](Id),
	[QuestionText] NVARCHAR(MAX) NOT NULL,
	[OrganizationId] INT NOT NULL,
	[CreatedBy] INT NULL,
	[CreatedDate] DATETIME NULL,
	[ModifiedBy] INT NULL,
	[ModifiedDate] DATETIME NULL
	CONSTRAINT PK_Question PRIMARY KEY (Id)
)
END
GO