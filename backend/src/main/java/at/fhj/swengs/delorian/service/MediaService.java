package at.fhj.swengs.delorian.service;

import at.fhj.swengs.delorian.model.Media;
import at.fhj.swengs.delorian.model.Project;
import at.fhj.swengs.delorian.repository.MediaRepository;
import at.fhj.swengs.delorian.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.*;

@Service
public class MediaService {

    private static final String UPLOAD_FOLDER = "uploads";

    @Autowired
    private MediaRepository mediaRepository;

    @Autowired
    private ProjectRepository projectRepository;

    /**
     * Save a media.
     *
     * @param media the entity to save
     * @return the persisted entity
     */
    public Media save(Media media) {
        return mediaRepository.save(media);
    }


    /**
     * Get one media by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<Media> findOne(Long id) {
        return mediaRepository.findById(id);
    }

    /**
     * Delete the media by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        mediaRepository.deleteById(id);

        //Delete the file from filesystem...
        File dest = retrieveMediaFile(id);
        dest.delete();
    }

    public Optional<Media> createMedia(Long projectID, MultipartFile multipartFile) throws IOException {

        Optional<Project> optProject = projectRepository.findById(projectID);
        if(optProject.isPresent()) {
            Media dbMedia = new Media();
            dbMedia.setOriginalFileName(multipartFile.getOriginalFilename());
            dbMedia.setContentType(multipartFile.getContentType());
            dbMedia.setSize(multipartFile.getSize());
            dbMedia.setProject(optProject.get());

            Media savedDbMedia = save(dbMedia);

            // Store file on filesystem
            File dest = retrieveMediaFile(savedDbMedia.getId());
            try (FileOutputStream fos = new FileOutputStream(dest)) {
                fos.write(multipartFile.getBytes());
            }
            return Optional.of(savedDbMedia);
        }
        return Optional.empty();
    }

    public File retrieveMediaFile(long mediaId) {
        File uploadsDir = retrieveUploadsDirectory();
        String filePath = uploadsDir.getAbsolutePath() + "/" + mediaId;
        return new File(filePath);
    }

    private File retrieveUploadsDirectory() {
        String uploadsDirPath = UPLOAD_FOLDER;
        File uploadsDir = new File(uploadsDirPath);
        if (!uploadsDir.exists()) {
            uploadsDir.mkdir();
        }
        return uploadsDir;
    }

    public Set<Media> getProjectMedias(Map<Long,String> dtos) {
        Set<Media> entities = new HashSet<>();
        if (dtos != null) {
            dtos.keySet().forEach((mediaID) -> entities.add(mediaRepository.findById(mediaID).get()));
        }
        return entities;
    }

}
