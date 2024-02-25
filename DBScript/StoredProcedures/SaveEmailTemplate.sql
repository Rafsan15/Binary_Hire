
--region PROCEDURE [dbo].[SaveEmailTemplate]
IF OBJECT_ID('[dbo].[SaveEmailTemplate]') IS NOT NULL 
    BEGIN 
        DROP PROC [dbo].[SaveEmailTemplate] 
    END 
GO 
     
CREATE PROC [dbo].[SaveEmailTemplate] 
( 
	@Id INT, 
	@EmailTypeId INT, 
	@Subject NVARCHAR (200), 
	@Body NVARCHAR(MAX), 
	@OrganizationId INT, 
	@ModifiedBy INT 
)
AS
DECLARE @LocalId INT = @Id;
DECLARE @LocalEmailTypeId INT = @EmailTypeId;
DECLARE @LocalSubject NVARCHAR (200) = LTRIM(RTRIM(@Subject));
DECLARE @LocalBody NVARCHAR(MAX) = LTRIM(RTRIM(@Body));
DECLARE @LocalOrganizationId INT = @OrganizationId;
DECLARE @LocalModifiedBy INT = @ModifiedBy;

IF @LocalId IS NULL OR @LocalId = 0
BEGIN
	INSERT INTO [dbo].[EmailTemplate]
	([EmailTypeId], [Subject], [Body], [OrganizationId], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate])
	SELECT @LocalEmailTypeId, @LocalSubject, @LocalBody, @LocalOrganizationId, @LocalModifiedBy, GETDATE(), NULL, NULL
	SET @LocalId = SCOPE_IDENTITY()
END
ELSE
BEGIN
	UPDATE [dbo].[EmailTemplate]
	SET
		[EmailTypeId] = @LocalEmailTypeId, [Subject] = @LocalSubject, [Body] = @LocalBody, [OrganizationId] = @LocalOrganizationId, [ModifiedBy] = @LocalModifiedBy, [ModifiedDate] = GETDATE()
		WHERE [Id] = @LocalId
END
SELECT @LocalId
GO
--endregion

