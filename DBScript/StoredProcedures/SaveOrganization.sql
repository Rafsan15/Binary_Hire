
--region PROCEDURE [dbo].[SaveOrganization]
IF OBJECT_ID('[dbo].[SaveOrganization]') IS NOT NULL 
    BEGIN 
        DROP PROC [dbo].[SaveOrganization] 
    END 
GO 
     
CREATE PROC [dbo].[SaveOrganization] 
( 
	@Id INT, 
	@Name NVARCHAR (50) 
)
AS
DECLARE @LocalId INT = @Id;
DECLARE @LocalName NVARCHAR (50) = LTRIM(RTRIM(@Name));

IF @LocalId IS NULL OR @LocalId = 0
BEGIN
	INSERT INTO [dbo].[Organization]
	([Name])
	SELECT @LocalName
	SET @LocalId = SCOPE_IDENTITY()
END
ELSE
BEGIN
	UPDATE [dbo].[Organization]
	SET
		[Name] = @LocalName
		WHERE [Id] = @LocalId
END
SELECT @LocalId
GO
--endregion

