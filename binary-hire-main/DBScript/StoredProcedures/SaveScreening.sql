
--region PROCEDURE [dbo].[SaveScreening]
IF OBJECT_ID('[dbo].[SaveScreening]') IS NOT NULL 
    BEGIN 
        DROP PROC [dbo].[SaveScreening] 
    END 
GO 
     
CREATE PROC [dbo].[SaveScreening] 
( 
	@Id INT, 
	@JobPostId INT, 
	@WorkflowMasterId INT, 
	@LocationPath NVARCHAR(MAX), 
	@Status INT, 
	@UserId INT 
)
AS
DECLARE @LocalId INT = @Id;
DECLARE @LocalJobPostId INT = @JobPostId;
DECLARE @LocalWorkflowMasterId INT = @WorkflowMasterId;
DECLARE @LocalLocationPath NVARCHAR(MAX) = LTRIM(RTRIM(@LocationPath));
DECLARE @LocalStatus INT = @Status;
DECLARE @LocalUserId INT = @UserId;

IF @LocalId IS NULL OR @LocalId = 0
BEGIN
	INSERT INTO [dbo].[Screening]
	([JobPostId], [WorkflowMasterId], [LocationPath], [Status], [UserId])
	SELECT @LocalJobPostId, @LocalWorkflowMasterId, @LocalLocationPath, @LocalStatus, @LocalUserId
	 	
	SET @LocalId = SCOPE_IDENTITY()
END
ELSE
BEGIN
	UPDATE [dbo].[Screening]
	SET
		[JobPostId] = @LocalJobPostId, [WorkflowMasterId] = @LocalWorkflowMasterId, [LocationPath] = @LocalLocationPath, [Status] = @LocalStatus, [UserId] = @LocalUserId
		WHERE [Id] = @LocalId
END
SELECT @LocalId
GO
--endregion

