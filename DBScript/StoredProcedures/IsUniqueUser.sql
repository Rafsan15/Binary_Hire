--region PROCEDURE [dbo].[IsUniqueUser] @UserName='akif'
IF OBJECT_ID('[dbo].[IsUniqueUser]') IS NOT NULL 
    BEGIN 
        DROP PROC [dbo].[IsUniqueUser] 
    END 
GO 
     
CREATE PROC [dbo].[IsUniqueUser] 
( 
	@UserName NVARCHAR(50)
)
AS
	SET NOCOUNT ON
	DECLARE @IsValid BIT;
	DECLARE @Count INT;
	SET @IsValid = 0;

	SELECT
	@Count = Count(*)
	FROM [dbo].[User]
	WHERE UserName=@UserName

	IF @Count=0
		SET @IsValid = 1

	SELECT @IsValid AS [IsValid] 
	
	SET NOCOUNT OFF
GO
--endregion