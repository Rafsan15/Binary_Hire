IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Result]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[Result](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ScreeningId] INT NOT NULL CONSTRAINT FK_Result_Screening REFERENCES [dbo].[Screening](Id),
	[Name] NVARCHAR(200),
	[Email] NVARCHAR(200) NOT NULL,
	[LocationPath] NVARCHAR(MAX) NOT NULL,
	[Score] FLOAT NOT NULL,
	[OrganizationId] INT NOT NULL,
	CONSTRAINT PK_Result PRIMARY KEY (Id)
)
END
GO