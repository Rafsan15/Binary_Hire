IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[UserManagement].[GroupRole]') AND type in (N'U'))
BEGIN
CREATE TABLE [UserManagement].[GroupRole](
	[groupId] [int] NOT NULL,
	[RoleId] [int] NOT NULL,
	[CreatedBy] VARCHAR(100),
	[CreatedDate] DATETIME DEFAULT GETDATE(),
	CONSTRAINT [fk_group_role_group] FOREIGN KEY([groupId]) REFERENCES [UserManagement].[Group] ([Id]),
	CONSTRAINT [fk_group_role_role] FOREIGN KEY([RoleId]) REFERENCES [UserManagement].[Role] ([Id]),
	 CONSTRAINT [pk_group_role] PRIMARY KEY NONCLUSTERED 
	(
		[groupId] ASC,
		[RoleId] ASC
	)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
	) ON [PRIMARY]
END
GO