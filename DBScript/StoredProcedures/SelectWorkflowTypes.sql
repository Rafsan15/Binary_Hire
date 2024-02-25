--region PROCEDURE [dbo].[SelectWorkflowTypes]
IF OBJECT_ID('[dbo].[SelectWorkflowTypes]') IS NOT NULL 
    BEGIN 
        DROP PROC [dbo].[SelectWorkflowTypes] 
    END 
GO 
     
CREATE PROC [dbo].[SelectWorkflowTypes] 

AS
	SELECT ID AS Id
		,[DisplayText] AS [Name]
	FROM [dbo].[Setting]
	WHERE SettingType = 'WorkflowType'
GO
--endregion

