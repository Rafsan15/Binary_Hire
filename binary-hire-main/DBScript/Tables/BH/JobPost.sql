IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[JobPost]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[JobPost](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Title] NVARCHAR(100),
	[Description] NVARCHAR(MAX),
	[JobType] INT,
	[MinExperience] INT,
	[MaxExperience] INT,
	[Location] NVARCHAR(100),
	[Education] NVARCHAR(100),
	[WorkPlace] INT,
	[Skills] NVARCHAR(MAX),
	[IsFav] BIT,
	[IsDeleted] BIT,
	[Status] INT,
	[OrganizationId] INT,
	[CreatedBy] INT,
	[CreatedDate] DATETIME,
	[ModifiedBy] INT,
	[ModifiedDate] DATETIME
	CONSTRAINT PK_JobPostID PRIMARY KEY (Id)
)
END
GO