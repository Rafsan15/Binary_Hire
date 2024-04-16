
--region PROCEDURE [dbo].[SaveQuestion]
IF OBJECT_ID('[dbo].[SaveQuestion]') IS NOT NULL 
    BEGIN 
        DROP PROC [dbo].[SaveQuestion] 
    END 
GO 
     
CREATE PROC [dbo].[SaveQuestion] 
( 
	@Id INT, 
	@JobId INT, 
	@QuestionText NVARCHAR(MAX), 
	@OrganizationId INT, 
	@ModifiedBy INT 
)
AS
DECLARE @LocalId INT = @Id;
DECLARE @LocalJobId INT = @JobId;
DECLARE @LocalQuestionText NVARCHAR(MAX) = LTRIM(RTRIM(@QuestionText));
DECLARE @LocalOrganizationId INT = @OrganizationId;
DECLARE @LocalModifiedBy INT = @ModifiedBy;

IF @LocalId IS NULL OR @LocalId = 0
BEGIN
	INSERT INTO [dbo].[Question]
	([JobId], [QuestionText], [OrganizationId], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate])
	SELECT @LocalJobId, @LocalQuestionText, @LocalOrganizationId, @LocalModifiedBy, GETDATE(), NULL, NULL
	SET @LocalId = SCOPE_IDENTITY()
END
ELSE
BEGIN
	UPDATE [dbo].[Question]
	SET
		[JobId] = @LocalJobId, [QuestionText] = @LocalQuestionText, [OrganizationId] = @LocalOrganizationId, [ModifiedBy] = @LocalModifiedBy, [ModifiedDate] = GETDATE()
		WHERE [Id] = @LocalId
END
SELECT @LocalId
GO
--endregion

