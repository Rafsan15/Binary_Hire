--region PROCEDURE [dbo].[SelectEmailTemplateById]
IF OBJECT_ID('[dbo].[SelectEmailTemplateById]') IS NOT NULL 
    BEGIN 
        DROP PROC [dbo].[SelectEmailTemplateById] 
    END 
GO 
     
CREATE PROC [dbo].[SelectEmailTemplateById] 
( 
	@Id INT
)
AS
	SELECT
	[Id],
	[EmailTypeId],
	[Subject],
	[Body],
	[OrganizationId],
	[CreatedBy],
	[CreatedDate],
	[ModifiedBy],
	[ModifiedDate]
	FROM [dbo].[EmailTemplate]
	WHERE Id=@Id
GO
--endregion

