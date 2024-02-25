--region PROCEDURE [dbo].[SelectScreeningByJobId]
IF OBJECT_ID('[dbo].[SelectScreeningByJobId]') IS NOT NULL 
    BEGIN 
        DROP PROC [dbo].[SelectScreeningByJobId] 
    END 
GO 
     
CREATE PROC [dbo].[SelectScreeningByJobId] 
( 
	@Id INT
)
AS
	SELECT
	[Id],
	[JobPostId],
	[WorkflowMasterId],
	[LocationPath],
	[Status],
	[UserId]
	FROM [dbo].[Screening]
	WHERE JobPostId=@Id
GO
--endregion

