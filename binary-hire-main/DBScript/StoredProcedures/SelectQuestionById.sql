--region PROCEDURE [dbo].[SelectQuestionById]
IF OBJECT_ID('[dbo].[SelectQuestionById]') IS NOT NULL 
    BEGIN 
        DROP PROC [dbo].[SelectQuestionById] 
    END 
GO 
     
CREATE PROC [dbo].[SelectQuestionById] 
( 
	@Id INT
)
AS
	SELECT
	[Id],
	[JobId],
	[QuestionText],
	[OrganizationId],
	[CreatedBy],
	[CreatedDate],
	[ModifiedBy],
	[ModifiedDate]
	FROM [dbo].[Question]
	WHERE Id=@Id
GO
--endregion

