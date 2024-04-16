IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Assessment]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[Assessment](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ResultId] INT NOT NULL CONSTRAINT FK_Assessment_Result REFERENCES [dbo].[Result](Id),
	[QuestionId] INT NOT NULL CONSTRAINT FK_Assessment_Question REFERENCES [dbo].[Question](Id),
	[Score] INT NOT NULL,
	[OrganizationId] INT NOT NULL,
	[CreatedBy] INT NULL,
	[CreatedDate] DATETIME NULL,
	[ModifiedBy] INT NULL,
	[ModifiedDate] DATETIME NULL,
	CONSTRAINT PK_Assessment PRIMARY KEY (Id)
)
END
GO