--region PROCEDURE [dbo].[SelectWorkplaces]
IF OBJECT_ID('[dbo].[SelectWorkplaces]') IS NOT NULL 
    BEGIN 
        DROP PROC [dbo].[SelectWorkplaces] 
    END 
GO 
     
CREATE PROC [dbo].[SelectWorkplaces] 

AS
	SELECT ID AS Id
		,[DisplayText] AS [Name]
	FROM [dbo].[Setting]
	WHERE SettingType = 'WorkPlace'
GO
--endregion

