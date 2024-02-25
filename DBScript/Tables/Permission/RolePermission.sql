IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[UserManagement].[RolePermission]') AND type in (N'U'))
BEGIN
CREATE TABLE [UserManagement].[RolePermission](
	[RoleId] [int] NOT NULL,
	[PermissionId] [int] NOT NULL,
	[HasPermission] [bit] NULL,
	[CreatedBy] VARCHAR(100),
	[CreatedDate] DATETIME DEFAULT GETDATE(),
	CONSTRAINT [fk_role_permission_role] FOREIGN KEY([RoleId]) REFERENCES [UserManagement].[Role] ([Id]),
	CONSTRAINT [pk_role_permission_permission] FOREIGN KEY([PermissionId]) REFERENCES [UserManagement].[Permission] ([Id]),
 CONSTRAINT [pk_role_permission] PRIMARY KEY NONCLUSTERED 
(
	[RoleId] ASC,
	[PermissionId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
END
GO