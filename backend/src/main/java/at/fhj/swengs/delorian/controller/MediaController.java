package at.fhj.swengs.delorian.controller;

import at.fhj.swengs.delorian.dto.ProjectDTO;
import at.fhj.swengs.delorian.model.Media;
import at.fhj.swengs.delorian.service.MediaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.URISyntaxException;
import java.util.Optional;

/**
 * REST controller for managing Media.
 */
@RestController
@RequestMapping
public class MediaController {

    @Autowired
    private MediaService mediaService;

    @PostMapping("/media/{projectID}")
    public ResponseEntity<Media> uploadMedia(@RequestPart MultipartFile file,@PathVariable long projectID) throws IOException, URISyntaxException {
        Optional<Media> optionalMedia=  mediaService.createMedia(projectID, file);
        if(optionalMedia.isPresent()) {
            return new ResponseEntity(optionalMedia.get(), HttpStatus.CREATED);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }


    @GetMapping("/media/{id}")
    public ResponseEntity<InputStreamResource> getMediaDownload(@PathVariable Long id) throws FileNotFoundException {
        Optional<Media> mediaResult = mediaService.findOne(id);
        if (!mediaResult.isPresent()) {
            throw new FileNotFoundException("Media with id " + id + " not found");
        }
        Media media = mediaResult.get();
        File mediaFile = mediaService.retrieveMediaFile(media.getId());
        InputStreamResource resource = new InputStreamResource(new FileInputStream(mediaFile));
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename=" + media.getOriginalFileName())
                .contentType(MediaType.parseMediaType(media.getContentType())).contentLength(media.getSize())
                .body(resource);
    }

    @DeleteMapping("/media/{id}")
    void delete(@PathVariable Long id) {
        mediaService.delete(id);
    }
}
