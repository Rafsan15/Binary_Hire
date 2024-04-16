SET IDENTITY_INSERT [dbo].[Setting] ON 
--Clear first then insert all rows
DELETE FROM [dbo].[Setting] 
GO

-- USER TYPE
IF NOT EXISTS (SELECT * FROM [dbo].[Setting] WHERE SettingType = 'UserType' AND DisplayText = 'Admin')
	INSERT [dbo].[Setting] ([ID], [SettingType], [DisplayText]) VALUES (1,N'UserType',N'Admin')
GO
IF NOT EXISTS (SELECT * FROM [dbo].[Setting] WHERE SettingType = 'UserType' AND DisplayText = 'Customer')
	INSERT [dbo].[Setting] ([ID], [SettingType], [DisplayText]) VALUES (2,N'UserType',N'Customer')
GO
IF NOT EXISTS (SELECT * FROM [dbo].[Setting] WHERE SettingType = 'WorkflowType' AND DisplayText = 'Experience')
	INSERT [dbo].[Setting] ([ID], [SettingType], [DisplayText]) VALUES (3,N'WorkflowType',N'Experience')
GO
IF NOT EXISTS (SELECT * FROM [dbo].[Setting] WHERE SettingType = 'WorkflowType' AND DisplayText = 'Education')
	INSERT [dbo].[Setting] ([ID], [SettingType], [DisplayText]) VALUES (4,N'WorkflowType',N'Education')
GO
IF NOT EXISTS (SELECT * FROM [dbo].[Setting] WHERE SettingType = 'WorkflowType' AND DisplayText = 'Skill')
	INSERT [dbo].[Setting] ([ID], [SettingType], [DisplayText]) VALUES (5,N'WorkflowType',N'Skill')
GO
IF NOT EXISTS (SELECT * FROM [dbo].[Setting] WHERE SettingType = 'WorkflowType' AND DisplayText = 'Language')
	INSERT [dbo].[Setting] ([ID], [SettingType], [DisplayText]) VALUES (6,N'WorkflowType',N'Language')
GO
IF NOT EXISTS (SELECT * FROM [dbo].[Setting] WHERE SettingType = 'JobType' AND DisplayText = 'Full-Time')
	INSERT [dbo].[Setting] ([ID], [SettingType], [DisplayText]) VALUES (7,N'JobType',N'Full-Time')
GO
IF NOT EXISTS (SELECT * FROM [dbo].[Setting] WHERE SettingType = 'JobType' AND DisplayText = 'Part-Time')
	INSERT [dbo].[Setting] ([ID], [SettingType], [DisplayText]) VALUES (8,N'JobType',N'Part-Time')
GO
IF NOT EXISTS (SELECT * FROM [dbo].[Setting] WHERE SettingType = 'JobType' AND DisplayText = 'Internship')
	INSERT [dbo].[Setting] ([ID], [SettingType], [DisplayText]) VALUES (9,N'JobType',N'Internship')
GO
IF NOT EXISTS (SELECT * FROM [dbo].[Setting] WHERE SettingType = 'JobType' AND DisplayText = 'Contract')
	INSERT [dbo].[Setting] ([ID], [SettingType], [DisplayText]) VALUES (10,N'JobTyspe',N'Contract')
GO
IF NOT EXISTS (SELECT * FROM [dbo].[Setting] WHERE SettingType = 'WorkPlace' AND DisplayText = 'On-Site')
	INSERT [dbo].[Setting] ([ID], [SettingType], [DisplayText]) VALUES (11,N'WorkPlace',N'On-Site')
GO
IF NOT EXISTS (SELECT * FROM [dbo].[Setting] WHERE SettingType = 'WorkPlace' AND DisplayText = 'Remote')
	INSERT [dbo].[Setting] ([ID], [SettingType], [DisplayText]) VALUES (12,N'WorkPlace',N'Remote')
GO
IF NOT EXISTS (SELECT * FROM [dbo].[Setting] WHERE SettingType = 'WorkPlace' AND DisplayText = 'Hybrid')
	INSERT [dbo].[Setting] ([ID], [SettingType], [DisplayText]) VALUES (13,N'WorkPlace',N'Hybrid')
GO
IF NOT EXISTS (SELECT * FROM [dbo].[Setting] WHERE SettingType = 'ScreeningStatus' AND DisplayText = 'Open')
	INSERT [dbo].[Setting] ([ID], [SettingType], [DisplayText]) VALUES (14,N'ScreeningStatus',N'Open')
GO
IF NOT EXISTS (SELECT * FROM [dbo].[Setting] WHERE SettingType = 'ScreeningStatus' AND DisplayText = 'In Progress')
	INSERT [dbo].[Setting] ([ID], [SettingType], [DisplayText]) VALUES (15,N'ScreeningStatus',N'In Progress')
GO
IF NOT EXISTS (SELECT * FROM [dbo].[Setting] WHERE SettingType = 'ScreeningStatus' AND DisplayText = 'Finished')
	INSERT [dbo].[Setting] ([ID], [SettingType], [DisplayText]) VALUES (16,N'ScreeningStatus',N'Finished')
GO
IF NOT EXISTS (SELECT * FROM [dbo].[Setting] WHERE SettingType = 'ScreeningStatus' AND DisplayText = 'Closed')
	INSERT [dbo].[Setting] ([ID], [SettingType], [DisplayText]) VALUES (17,N'ScreeningStatus',N'Closed')
GO
IF NOT EXISTS (SELECT * FROM [dbo].[Setting] WHERE SettingType = 'RequestStatus' AND DisplayText = 'Queued')
	INSERT [dbo].[Setting] ([ID], [SettingType], [DisplayText]) VALUES (18,N'RequestStatus',N'Queued')
GO
IF NOT EXISTS (SELECT * FROM [dbo].[Setting] WHERE SettingType = 'RequestStatus' AND DisplayText = 'In Progress')
	INSERT [dbo].[Setting] ([ID], [SettingType], [DisplayText]) VALUES (19,N'RequestStatus',N'In Progress')
GO
IF NOT EXISTS (SELECT * FROM [dbo].[Setting] WHERE SettingType = 'RequestStatus' AND DisplayText = 'Completed')
	INSERT [dbo].[Setting] ([ID], [SettingType], [DisplayText]) VALUES (20,N'RequestStatus',N'Completed')
GO
IF NOT EXISTS (SELECT * FROM [dbo].[Setting] WHERE SettingType = 'EmailTemplateType' AND DisplayText = 'Acceptance Email')
	INSERT [dbo].[Setting] ([ID], [SettingType], [DisplayText]) VALUES (21,N'EmailTemplateType',N'Acceptance Email')
GO
IF NOT EXISTS (SELECT * FROM [dbo].[Setting] WHERE SettingType = 'EmailTemplateType' AND DisplayText = 'Rejection Email')
	INSERT [dbo].[Setting] ([ID], [SettingType], [DisplayText]) VALUES (22,N'EmailTemplateType',N'Rejection Email')
GO