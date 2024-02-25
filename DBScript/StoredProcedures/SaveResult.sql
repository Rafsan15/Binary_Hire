
--region PROCEDURE [dbo].[SaveResult]
IF OBJECT_ID('[dbo].[SaveResult]') IS NOT NULL 
    BEGIN 
        DROP PROC [dbo].[SaveResult] 
    END 
GO 
     
CREATE PROC [dbo].[SaveResult] 
( 
	@Id INT, 
	@ScreeningId INT, 
	@Name NVARCHAR (200), 
	@Email NVARCHAR (200), 
	@LocationPath NVARCHAR(MAX), 
	@Score FLOAT, 
	@OrganizationId INT 
)
AS
DECLARE @LocalId INT = @Id;
DECLARE @LocalScreeningId INT = @ScreeningId;
DECLARE @LocalName NVARCHAR (200) = LTRIM(RTRIM(@Name));
DECLARE @LocalEmail NVARCHAR (200) = LTRIM(RTRIM(@Email));
DECLARE @LocalLocationPath NVARCHAR(MAX) = LTRIM(RTRIM(@LocationPath));
DECLARE @LocalScore FLOAT = @Score;
DECLARE @LocalOrganizationId INT = @OrganizationId;

IF @LocalId IS NULL OR @LocalId = 0
BEGIN
	INSERT INTO [dbo].[Result]
	([ScreeningId], [Name], [Email], [LocationPath], [Score], [OrganizationId])
	SELECT @LocalScreeningId, @LocalName, @LocalEmail, @LocalLocationPath, @LocalScore, @LocalOrganizationId 	
	SET @LocalId = SCOPE_IDENTITY()
END
ELSE
BEGIN
	UPDATE [dbo].[Result]
	SET
		[ScreeningId] = @LocalScreeningId, [Name] = @LocalName, [Email] = @LocalEmail, [LocationPath] = @LocalLocationPath, [Score] = @LocalScore, [OrganizationId] = @LocalOrganizationId
		WHERE [Id] = @LocalId
END
SELECT @LocalId
GO
--endregion

