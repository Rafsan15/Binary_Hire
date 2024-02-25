--region PROCEDURE [dbo].[SelectWorkflowMasterById] @Id=2
IF OBJECT_ID('[dbo].[SelectWorkflowMasterById]') IS NOT NULL 
    BEGIN 
        DROP PROC [dbo].[SelectWorkflowMasterById] 
    END 
GO 
     
CREATE PROC [dbo].[SelectWorkflowMasterById] 
( 
	@Id INT
)
AS
	SELECT [WM].[Id]
		,[WM].[Name]
		,[WM].[OrganizationId]
		,[ORG].[Name] AS [OrganizationName]
		,[WM].[CreatedBy]
		,[WM].[CreatedDate]
		,[WM].[ModifiedBy]
		,[WM].[ModifiedDate]
	FROM [dbo].[WorkflowMaster] AS [WM]
	LEFT JOIN [dbo].[Organization] AS [ORG] ON [ORG].[Id] = [WM].[OrganizationId]
	WHERE [WM].[Id] = @Id

	SELECT [WD].[Id]
		,[WD].[WorkflowMasterId]
		,[WD].[WorkflowTypeId]
		,[STG].[DisplayText] AS [WorkflowTypeName]
		,[WD].[Priority]
		,[WD].[CreatedBy]
		,[WD].[CreatedDate]
		,[WD].[ModifiedBy]
		,[WD].[ModifiedDate]
	FROM [dbo].[WorkflowDetail] AS [WD]
	LEFT JOIN [dbo].[Setting] AS [STG] ON [STG].[ID] = [WD].[WorkflowTypeId]
	WHERE [WD].[WorkflowMasterId] = @Id
GO
--endregion

