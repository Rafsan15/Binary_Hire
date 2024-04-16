--region PROCEDURE [dbo].[SelectWorkflowByJob]
IF OBJECT_ID('[dbo].[SelectWorkflowByJob]') IS NOT NULL 
    BEGIN 
        DROP PROC [dbo].[SelectWorkflowByJob] 
    END 
GO 
     
CREATE PROC [dbo].[SelectWorkflowByJob] 
( 
	@JobPostId INT
)
AS
	SELECT
	WorkflowMasterId
	FROM [dbo].[Screening]
	WHERE JobPostId=@JobPostId
GO
--endregion

