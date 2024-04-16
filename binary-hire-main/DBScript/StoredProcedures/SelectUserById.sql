--region PROCEDURE [dbo].[SelectUserById]
IF OBJECT_ID('[dbo].[SelectUserById]') IS NOT NULL 
    BEGIN 
        DROP PROC [dbo].[SelectUserById] 
    END 
GO 
     
CREATE PROC [dbo].[SelectUserById] 
( 
	@Id INT
)
AS
	SELECT
	[Id],
	[UserName],
	[FirstName],
	[LastName],
	[AspnetUserId],
	[UserTypeId],
	[OrganizationId],
	[Email],
	[PhoneNumber],
	[Active]
	FROM [dbo].[User]
	WHERE Id=@Id
GO
--endregion

