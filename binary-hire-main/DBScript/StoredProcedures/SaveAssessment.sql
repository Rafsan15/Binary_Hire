
--region PROCEDURE [dbo].[SaveAssessment]
IF OBJECT_ID('[dbo].[SaveAssessment]') IS NOT NULL 
    BEGIN 
        DROP PROC [dbo].[SaveAssessment] 
    END 
GO 
     
CREATE PROC [dbo].[SaveAssessment] 
( 
	@Id INT, 
	@ResultId INT, 
	@QuestionId INT, 
	@Score INT, 
	@OrganizationId INT, 
	@ModifiedBy INT 
)
AS
DECLARE @LocalId INT = @Id;
DECLARE @LocalResultId INT = @ResultId;
DECLARE @LocalQuestionId INT = @QuestionId;
DECLARE @LocalScore INT = @Score;
DECLARE @LocalOrganizationId INT = @OrganizationId;
DECLARE @LocalModifiedBy INT = @ModifiedBy;

IF @LocalId IS NULL OR @LocalId = 0
BEGIN
	INSERT INTO [dbo].[Assessment]
	([ResultId], [QuestionId], [Score], [OrganizationId], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate])
	SELECT @LocalResultId, @LocalQuestionId, @LocalScore, @LocalOrganizationId, @LocalModifiedBy, GETDATE(), NULL, NULL
	SET @LocalId = SCOPE_IDENTITY()
END
ELSE
BEGIN
	UPDATE [dbo].[Assessment]
	SET
		[ResultId] = @LocalResultId, [QuestionId] = @LocalQuestionId, [Score] = @LocalScore, [OrganizationId] = @LocalOrganizationId, [ModifiedBy] = @LocalModifiedBy, [ModifiedDate] = GETDATE()
		WHERE [Id] = @LocalId
END
SELECT @LocalId
GO
--endregion

