--region PROCEDURE [dbo].[SelectScreeningById]
IF OBJECT_ID('[dbo].[SelectScreeningById]') IS NOT NULL 
    BEGIN 
        DROP PROC [dbo].[SelectScreeningById] 
    END 
GO 
     
CREATE PROC [dbo].[SelectScreeningById] 
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
	WHERE Id=@Id
GO
--endregion

