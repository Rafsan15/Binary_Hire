--region PROCEDURE [dbo].[SelectJobTypes]
IF OBJECT_ID('[dbo].[SelectJobTypes]') IS NOT NULL 
    BEGIN 
        DROP PROC [dbo].[SelectJobTypes] 
    END 
GO 
     
CREATE PROC [dbo].[SelectJobTypes] 

AS
	SELECT ID AS Id
		,[DisplayText] AS [Name]
	FROM [dbo].[Setting]
	WHERE SettingType = 'JobType'
GO
--endregion

