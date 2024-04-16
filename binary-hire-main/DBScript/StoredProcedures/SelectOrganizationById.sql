--region PROCEDURE [dbo].[SelectOrganizationById]
IF OBJECT_ID('[dbo].[SelectOrganizationById]') IS NOT NULL 
    BEGIN 
        DROP PROC [dbo].[SelectOrganizationById] 
    END 
GO 
     
CREATE PROC [dbo].[SelectOrganizationById] 
( 
	@Id INT
)
AS
	SELECT
	[Id],
	[Name]
	FROM [dbo].[Organization]
	WHERE Id=@Id
GO
--endregion

