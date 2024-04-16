IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[UserManagement].[Group]') AND type in (N'U'))
BEGIN
CREATE TABLE [UserManagement].[Group](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[GroupName] [varchar](50) NULL,
	[OrganizationId] [int] NULL  FOREIGN KEY REFERENCES [UserManagement].Organization(ID), 	
	[CreatedBy] VARCHAR(100),
	[CreatedDate] DATETIME DEFAULT GETDATE(),
	[ModifiedBy] VARCHAR(100),
	[ModifiedDate] DATETIME, 
 CONSTRAINT [pk_group] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
END
GO
SET ANSI_PADDING OFF
GO
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID(N'[UserManagement].[Group]') AND name = N'ix_organization_id')
CREATE NONCLUSTERED INDEX [ix_organization_id] ON [UserManagement].[Group] 
(
	[OrganizationId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
GO