using BH.API.ActionFilters;
using BH.Models;
using BH.Models.ResponseModels;
using BH.Models.ViewModels;
using BH.Services.Interface;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace BH.API.Controllers;

[ApiController]
[RoleValidation(Roles = new string[]{"Customer"})]
[Route("api/[controller]")]
public class JobPostController : Controller
{
    private readonly ILogger<JobPostController> _logger;
    private readonly IJobPostService _jobPostService;
    public JobPostController(ILogger<JobPostController> logger, IJobPostService jobPostService)
    {
        _logger = logger;
        _jobPostService = jobPostService;
    }
    [HttpPost()]
    [Route("save")]
    public async Task<IActionResult> SaveJobPost(JobPostRequestModel jobPost)
    {
        _logger.LogInformation("SaveDailyShiftRegister starts");

        try
        {
            _logger.LogInformation($"Going to execute _jobPostService.SaveJobPost()");
            var response = await _jobPostService.SaveJobPost(jobPost);
            _logger.LogInformation($"Completed _jobPostService.SaveJobPost()");

            if (response.Data != null)
            {
                response.IsSuccess = true; 
                return Ok(response);
            }
            else
            {
                _logger.LogInformation("SaveJobPost - failed to execute");
            }
        }
        catch (Exception ex)
        {
            _logger.LogError("SaveJobPost - Exception : " + ex.ToString());
        }
        return StatusCode(500);
    }
    
    [HttpPost()]
    [Route("get-by-id")]
    public async Task<IActionResult> GetJobPostById([FromBody] int id)
    {
        _logger.LogInformation("GetJobPostById starts");
        ResultModel<JobPostResponse> response = new ResultModel<JobPostResponse>();
        try
        {
            if (id == 0)
            {
                response.Message = "id can not be 0";
                _logger.LogError($"GetJobPostById - {response.Message}");
                return BadRequest(response);
            }
            _logger.LogInformation($"Going to execute _jobPostService.GetJobPostById()");
            response = await _jobPostService.GetJobPostById(id);
            _logger.LogInformation($"Completed _jobPostService.GetJobPostById()");
            if (response.Data != null)
            {
                response.IsSuccess = true;
                return Ok(response);
            }
            else
            {
                _logger.LogError("GetJobPostById - failed to execute");
            }
        }
        catch (Exception ex)
        {
            _logger.LogError("GetJobPostById - Exception : " + ex.ToString());
        }
        return StatusCode(500);
    }

    [HttpPost()]
    [Route("get-current-request-status-by-id")]
    public async Task<IActionResult> GetCurrentRequestStatusById([FromBody] int id)
    {
        _logger.LogInformation("GetCurrentRequestStatusById starts");
        ResultModel<string> response = new ResultModel<string>();
        try
        {
            if (id == 0)
            {
                response.Message = "id can not be 0";
                _logger.LogError($"GetCurrentRequestStatusById - {response.Message}");
                return BadRequest(response);
            }
            _logger.LogInformation($"Going to execute _jobPostService.GetCurrentRequestStatusById()");
            response.Data = await _jobPostService.GetCurrentRequestStatusById(id);
            _logger.LogInformation($"Completed _jobPostService.GetCurrentRequestStatusById()");
            if (!string.IsNullOrEmpty(response.Data))
            {
                response.IsSuccess = true;
                return Ok(response);
            }
            else
            {
                _logger.LogError("GetCurrentRequestStatusById - failed to execute");
                response.IsSuccess = false;
                response.Message = "Something went wrong. Please try again later.";
                return Ok(response);
            }
        }
        catch (Exception ex)
        {
            _logger.LogError("GetCurrentRequestStatusById - Exception : " + ex.ToString());
        }
        return StatusCode(500);
    }

    [HttpPost()]
    [Route("get-all")]
    public async Task<IActionResult> GetAllJobPosts(JobPostListModel jobPost)
    {
        _logger.LogInformation("GetAllJobPosts starts");
        try
        {
            _logger.LogInformation($"Going to execute _jobPostService.GetAllJobPost()");
            var response = await _jobPostService.GetAllJobPost(jobPost);
            _logger.LogInformation($"Completed _jobPostService.GetAllJobPost()");
            if (response.Data != null)
            {
                response.IsSuccess = true;
                return Ok(response);
            }
            else
            {
                _logger.LogError("GetAllJobPost - failed to execute");
            }
        }
        catch (Exception ex)
        {
            _logger.LogError("GetAllJobPost - Exception : " + ex.ToString());
        }
        return StatusCode(500);
    }
    
    [HttpPost()]
    [Route("get-all-count")]
    public async Task<IActionResult> GetAllJobPostCount(JobPostListModel jobPost)
    {
        _logger.LogInformation("GetAllJobPostsCount starts");
        try
        {
            _logger.LogInformation($"Going to execute _jobPostService.GetAllJobPostCount()");
            var response = await _jobPostService.GetAllJobPostCount(jobPost);
            _logger.LogInformation($"Completed _jobPostService.GetAllJobPostCount()");
            if (response.Data != null)
            {
                response.IsSuccess = true;
                return Ok(response);
            }
            else
            {
                _logger.LogError("GetAllJobPostCount - failed to execute");
            }
        }
        catch (Exception ex)
        {
            _logger.LogError("GetAllJobPostCount - Exception : " + ex.ToString());
        }
        return StatusCode(500);
    }
    
    [HttpGet]
    [Route("get-all-job-type")]
    public async Task<IActionResult> GetAllJobTypes()
    {
        _logger.LogInformation("GetAllJobTypes starts");
        // int OrganizationId = 0;
        // int.TryParse(Request.Headers.Where(h => h.Key.Equals("OrganizationId", StringComparison.OrdinalIgnoreCase)).Select(h => h.Value).FirstOrDefault(), out OrganizationId);
 
        try
        {
            _logger.LogInformation($"Going to execute _jobPostService.GetAllJobTypes()");
            var response = await _jobPostService.GetAllJobTypes();
            _logger.LogInformation($"Completed _jobPostService.GetAllJobTypes()");
            if (response.Data != null)
            {
                response.IsSuccess = true;
                return Ok(response);
            }
            else
            {
                _logger.LogError("GetAllJobTypes - failed to execute");
            }
        }
        catch (Exception ex)
        {
            _logger.LogError("GetAllJobTypes - Exception : " + ex.ToString());
        }
        return StatusCode(500);
    }
    
    [HttpGet]
    [Route("get-all-workplace")]
    public async Task<IActionResult> GetAllWorkPlaces()
    {
        _logger.LogInformation("GetAllWorkPlaces starts");
        // int OrganizationId = 0;
        // int.TryParse(Request.Headers.Where(h => h.Key.Equals("OrganizationId", StringComparison.OrdinalIgnoreCase)).Select(h => h.Value).FirstOrDefault(), out OrganizationId);
 
        try
        {
            _logger.LogInformation($"Going to execute _jobPostService.GetAllWorkPlaces()");
            var response = await _jobPostService.GetAllWorkPlaces();
            _logger.LogInformation($"Completed _jobPostService.GetAllWorkPlaces()");
            if (response.Data != null)
            {
                response.IsSuccess = true;
                return Ok(response);
            }
            else
            {
                _logger.LogError("GetAllWorkPlaces - failed to execute");
            }
        }
        catch (Exception ex)
        {
            _logger.LogError("GetAllWorkPlaces - Exception : " + ex.ToString());
        }
        return StatusCode(500);
    }

    [HttpPost]
    [Route("save-by-url")]
    public async Task<IActionResult> SavePostByUrl(UrlInputModel urlInputModel)
    {
        _logger.LogInformation("SavePostByUrl starts");
        try
        {
            _logger.LogInformation($"Going to execute _jobPostService.SavePostByUrl()");
            var response = await _jobPostService.SaveJobByUrl(urlInputModel);
            _logger.LogInformation($"Completed _jobPostService.SavePostByUrl()");
            if (response.Data != null)
            {
                response.IsSuccess = true;
                return Ok(response);
            }
            else
            {
                _logger.LogError("SavePostByUrl - failed to execute");
            }
        }
        catch (Exception ex)
        {
            _logger.LogError("SavePostByUrl - Exception : " + ex.ToString());
        }
        return StatusCode(500);
    }
    
    [HttpPost]
    [Route("delete")]
    public async Task<IActionResult> DeletePost(JobPostDeleteModel ids)
    {
        _logger.LogInformation("DeletePost starts");
        try
        {
            _logger.LogInformation($"Going to execute _jobPostService.DeletePost()");
            var response = await _jobPostService.DeletePost(ids);
            _logger.LogInformation($"Completed _jobPostService.DeletePost()");
            if (response.Data != null)
            {
                response.IsSuccess = true;
                return Ok(response);
            }
            else
            {
                _logger.LogError("DeletePost - failed to execute");
            }
        }
        catch (Exception ex)
        {
            _logger.LogError("DeletePost - Exception : " + ex.ToString());
        }
        return StatusCode(500);
    }

    [HttpGet]
    [Route("get-all-skills")]
    public async Task<IActionResult> GetAllSkills()
    {
        _logger.LogInformation("GetAllSkills starts");
        ResultModel<string[]> result = new ResultModel<string[]>();
        try
        {
            _logger.LogInformation($"Going to execute _jobPostService.GetAllSkills()");
            var response = await _jobPostService.getAllSkills();
            _logger.LogInformation($"Completed _jobPostService.GetAllSkills()");
            result.Data = response;
            result.IsSuccess = true;
            return Ok(result);
        }
        catch (Exception ex)
        {
            _logger.LogError("GetAllSkills - Exception : " + ex.ToString());
        }
        return StatusCode(500);
    }
    
    [HttpPost]
    [Route("get-job-favourites")]
    public async Task<IActionResult> GetJobFavourites(JobFavModel jobFavModel)
    {
        _logger.LogInformation("GetJobFavourites starts");
        try
        {
            _logger.LogInformation($"Going to execute _jobPostService.GetJobFavourites()");
            var response = await _jobPostService.GetJobFavourites(jobFavModel);
            _logger.LogInformation($"Completed _jobPostService.GetJobFavourites()");
            if (response.Data != null)
            {
                response.IsSuccess = true;
                return Ok(response);
            }
            else
            {
                _logger.LogError("GetJobFavourites - failed to execute");
            }
            return Ok(response);
        }
        catch (Exception ex)
        {
            _logger.LogError("GetJobFavourites - Exception : " + ex.ToString());
        }
        return StatusCode(500);
    }
    
    [HttpPost]
    [Route("update-job-favourites")]
    public async Task<IActionResult> UpdateJobFavourite(UpdateJobFavModel jobFavModel)
    {
        _logger.LogInformation("UpdateJobFavourite starts");
        try
        {
            _logger.LogInformation($"Going to execute _jobPostService.UpdateJobFavourite()");
            var response = await _jobPostService.UpdateJobFavourite(jobFavModel);
            _logger.LogInformation($"Completed _jobPostService.UpdateJobFavourite()");
            if (response.Data != null)
            {
                response.IsSuccess = true;
                return Ok(response);
            }
            else
            {
                _logger.LogError("UpdateJobFavourite - failed to execute");
            }
            return Ok(response);
        }
        catch (Exception ex)
        {
            _logger.LogError("UpdateJobFavourite - Exception : " + ex.ToString());
        }
        return StatusCode(500);
    }
    
    [HttpPost]
    [Route("save-note")]
    public async Task<IActionResult> SaveNote(NoteModel model)
    {
        _logger.LogInformation("SaveNote starts");
        try
        {
            _logger.LogInformation($"Going to execute _jobPostService.SaveNote()");
            var response = await _jobPostService.SaveNote(model);
            _logger.LogInformation($"Completed _jobPostService.SaveNote()");
            if (response.Data != null)
            {
                response.IsSuccess = true;
                return Ok(response);
            }
            else
            {
                _logger.LogError("SaveNote - failed to execute");
            }
            return Ok(response);
        }
        catch (Exception ex)
        {
            _logger.LogError("SaveNote - Exception : " + ex.ToString());
        }
        return StatusCode(500);
    }

}