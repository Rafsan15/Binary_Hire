--region PROCEDURE [dbo].[SelectEmailTemplateTypes]
IF OBJECT_ID('[dbo].[SelectEmailTemplateTypes]') IS NOT NULL 
    BEGIN 
        DROP PROC [dbo].[SelectEmailTemplateTypes] 
    END 
GO 
     
CREATE PROC [dbo].[SelectEmailTemplateTypes] 

AS
	SELECT ID AS Id
		,[DisplayText] AS [Name]
	FROM [dbo].[Setting]
	WHERE SettingType = 'EmailTemplateType'
GO
--endregion

