--region PROCEDURE [dbo].[IsValidUser] @UserId='1', @Role='Admin,Customer'
IF OBJECT_ID('[dbo].[IsValidUser]') IS NOT NULL 
    BEGIN 
        DROP PROC [dbo].[IsValidUser] 
    END 
GO 
     
CREATE PROC [dbo].[IsValidUser] 
( 
	@UserId INT,
	@Role NVARCHAR(50)
)
AS
	SET NOCOUNT ON
	DECLARE @TmpUserRole table ( RoleName VARCHAR(50) );
	DECLARE @Count INT;
	DECLARE @IsValid BIT;
	SET @IsValid = 0;

	INSERT INTO @TmpUserRole SELECT value FROM STRING_SPLIT(@Role, ',');
	
	SELECT @Count = Count(*)
	FROM [dbo].[User] AS U
	LEFT JOIN [dbo].[Setting] AS S ON U.UserTypeId = S.ID
	WHERE U.Id = @UserId AND S.DisplayText IN (SELECT * FROM @TmpUserRole)

	IF @Count>0
		SET @IsValid = 1

	SELECT @IsValid AS [IsValid] 
	
	SET NOCOUNT OFF
GO
--endregion