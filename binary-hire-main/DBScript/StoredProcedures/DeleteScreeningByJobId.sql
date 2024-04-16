--region PROCEDURE [dbo].[DeleteScreeningByJobId]
IF OBJECT_ID('[dbo].[DeleteScreeningByJobId]') IS NOT NULL 
    BEGIN 
        DROP PROC [dbo].[DeleteScreeningByJobId] 
    END 
GO 
     
CREATE PROC [dbo].[DeleteScreeningByJobId] 
( 
	@JobPostId INT
)
AS
	DELETE [dbo].[Screening]
	WHERE JobPostId=@JobPostId
GO
--endregion
