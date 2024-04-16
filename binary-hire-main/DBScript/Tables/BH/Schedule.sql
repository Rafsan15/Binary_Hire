IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Schedule]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[Schedule](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[JobPostId] INT NOT NULL CONSTRAINT FK_Schedule_JobPost REFERENCES [dbo].[JobPost](Id),
	[ResultId] INT NOT NULL CONSTRAINT FK_Schedule_Result REFERENCES [dbo].[Result](Id),
	[OnDate] DATE NOT NULL,
	[StartTime] DATETIME NOT NULL,
	[EndTime] DATETIME NOT NULL,
	[OrganizationId] INT NOT NULL,
	[CreatedBy] INT NULL,
	[CreatedDate] DATETIME NULL,
	[ModifiedBy] INT NULL,
	[ModifiedDate] DATETIME NULL
	CONSTRAINT PK_Schedule PRIMARY KEY (Id)
)
END
GO