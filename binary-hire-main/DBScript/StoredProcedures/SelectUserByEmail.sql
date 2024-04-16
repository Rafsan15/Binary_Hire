--region PROCEDURE [dbo].[SelectUserByEmail]
IF OBJECT_ID('[dbo].[SelectUserByEmail]') IS NOT NULL 
    BEGIN 
        DROP PROC [dbo].[SelectUserByEmail] 
    END 
GO 
     
CREATE PROC [dbo].[SelectUserByEmail] 
( 
	@Email NVARCHAR(50)
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
	WHERE [Email]=@Email
GO
--endregion

