package at.fhj.swengs.delorian.service;

import at.fhj.swengs.delorian.model.Media;
import at.fhj.swengs.delorian.repository.MediaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Optional;

@Service
public class MediaService {

    private static final String UPLOAD_FOLDER = "uploads";

    @Autowired
    private MediaRepository mediaRepository;


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
    }

    public Media createMedia(MultipartFile multipartFile) throws IOException {
        Media dbMedia = new Media();
        dbMedia.setOriginalFileName(multipartFile.getOriginalFilename());
        dbMedia.setContentType(multipartFile.getContentType());
        dbMedia.setSize(multipartFile.getSize());
        Media savedDbMedia = save(dbMedia);

        // Store file on filesystem
        File dest = retrieveMediaFile(savedDbMedia);
        try (FileOutputStream fos = new FileOutputStream(dest)) {
            fos.write(multipartFile.getBytes());
        }
        return savedDbMedia;
    }

    public File retrieveMediaFile(Media media) {
        File uploadsDir = retrieveUploadsDirectory();
        String filePath = uploadsDir.getAbsolutePath() + "/" + media.getId();
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

}
